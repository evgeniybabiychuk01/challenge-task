/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  CircularProgress,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { Response } from "./types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<Response | null>(null);
  const [value, setValue] = useState(undefined);

  console.log(isLoading, "isLoading");
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(value)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      setData(responseData as Response);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = debounce((criteria: any) => {
    setValue(criteria);
  }, 400);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    if (value) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const sortData = useCallback(() => {
    setIsLoading(true);
    if (data?.docs) {
      const sorted = [...data.docs].sort(
        (a, b) => a.first_publish_year - b.first_publish_year
      );
      //@ts-ignore
      setData((prevData) => ({ ...prevData, docs: sorted }));
    }
    setIsLoading(false);
  }, [data]);

  return (
    <Box sx={{ padding: "70px" }}>
      <Typography
        sx={{ paddingBottom: "20px", textAlign: "center", fontSize: "30px" }}
      >
        Search Books
      </Typography>

      <Box>
        <input
          placeholder="Search book"
          onChange={onInputChange}
          style={{ width: "100%", height: "50px", padding: "20px" }}
        />
        {data?.docs.length && (
          <Button
            sx={{ marginTop: "40px" }}
            variant="contained"
            onClick={sortData}
          >
            Sort By publish date
          </Button>
        )}
      </Box>
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            paddingTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data?.docs?.length ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", paddingY: "30px" }}>
              {data?.docs?.map((el, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "250px",
                    minHeight: "350px",
                    background: "#262624",
                    borderRadius: "16px",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginRight: "30px",
                    marginBottom: "30px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <img
                    src="/avatar_book-sm.png"
                    height={130}
                    style={{ marginTop: "20px" }}
                    alt="placholder"
                  />
                  <Typography
                    fontSize={14}
                    sx={{
                      paddingTop: "20px",
                      paddingBottom: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {el.title}
                  </Typography>
                  {!!el?.author_name && (
                    <Typography
                      color="#746e6e"
                      sx={{ paddingBottom: "5px" }}
                      fontSize={12}
                    >
                      by {el?.author_name}
                    </Typography>
                  )}
                  <Typography
                    sx={{ paddingBottom: "5px" }}
                    color="#746e6e"
                    fontSize={12}
                  >
                    {" "}
                    Published in {el.first_publish_year}
                  </Typography>
                  <Typography
                    sx={{ paddingBottom: "5px" }}
                    color="#746e6e"
                    fontSize={12}
                  >
                    {" "}
                    202 pages
                  </Typography>
                  {el?.isbn && (
                    <Typography
                      noWrap
                      color="#746e6e"
                      fontSize={12}
                      sx={{ width: "100%" }}
                    >
                      ISBN {el.isbn}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", marginTop: "20px" }}
            >
              No results found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}
