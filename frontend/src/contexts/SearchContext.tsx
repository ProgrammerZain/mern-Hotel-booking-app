import React, { useContext, useState } from "react";
type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValue: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};
const SearchContext = React.createContext<SearchContext | undefined>(undefined);
const getsessionStorageValue = (name: any) => {
  return sessionStorage.getItem(name);
};
const setsessionStorageValue = (name: any, value: any) => {
  sessionStorage.setItem(name, value);
};
type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(
    getsessionStorageValue("destination") || ""
  );
  const [checkIn, setCheckIn] = useState<Date>(
    new Date(getsessionStorageValue("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState<Date>(
    new Date(getsessionStorageValue("checkOut") || new Date().toISOString())
  );
  const [adultCount, setAdultCount] = useState<number>(
    parseInt(getsessionStorageValue("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState<number>(
    parseInt(getsessionStorageValue("adultCount") || "0")
  );
  const [hotelId, sethotelId] = useState<string>(
    getsessionStorageValue("hotelId") || ""
  );

  const saveSearchValue = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);

    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      sethotelId(hotelId);
      setsessionStorageValue("hotelId", hotelId);
    }
    setsessionStorageValue("destination", destination);
    setsessionStorageValue("checkIn", checkIn.toISOString());
    setsessionStorageValue("checkOut", checkOut.toISOString());
    setsessionStorageValue("adultCount", adultCount.toString());
    setsessionStorageValue("childCount", childCount.toString());
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        saveSearchValue,
        hotelId,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
