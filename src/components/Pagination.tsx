import { Pagination as Pages } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Pagination = ({ all = 0, paramsName = "page" }) => {
    const [page, setPage] = useState(1);
    const location = useRouter();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        location.query[paramsName] = value.toString();
        location.push({
            query: location.query
        })
    };

    useEffect(() => {
        let p: any = location.query['page'];
        setPage(p ? parseInt(p) : 1);
    }, [location]);

    return (
        <>
            {all > 1 ? <div className="my-5 flex justify-center">
                <Pages
                    count={all}
                    onChange={handleChange}
                    page={page}
                    variant="outlined"
                    color="primary"
                />
            </div> : ""}
        </>
    );
};
export default Pagination;
