import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

const FilterContext = createContext(null);

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function useFilter() {
  return useContext(FilterContext);
}

export default function FilterProvider({ children }) {
  const [filters, setFilters] = useState([]);
  const prevFilters = usePrevious(filters);

  useEffect(() => {
    async function loadingStorageData() {
      const storageFilters = await AsyncStorage.getItem("@CF:filters");
      if (storageFilters) {
        setFilters(JSON.parse(storageFilters));
      }
    }
    loadingStorageData();
  }, []);

  async function saveFilter(newfilter) {
    setFilters((prevFilters) => [...prevFilters, newfilter]);

    await AsyncStorage.setItem(
      "@CF:filters",
      JSON.stringify([...filters, newfilter])
    );
  }

  async function removeFilter(item) {
    let newfilter = filters.slice();
    newfilter.splice(item, 1);
    setFilters(newfilter);
    await AsyncStorage.setItem("@CF:filters", JSON.stringify(newfilter));
  }

  async function cleanFilter() {
    setFilters([]);
    await AsyncStorage.setItem("@CF:filters", JSON.stringify([]));
  }

  //   useEffect(() => {
  //   console.log('filters', filters)
  
    
  // }, [filters])

  return (
    <FilterContext.Provider
      value={{
        filters,
        prevFilters,
        removeFilter,
        saveFilter,
        cleanFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
