import { Box, CircularProgress } from "@mui/material";
import axios, { AxiosError } from "axios";
import React from "react";
import { FC, useEffect } from "react"
import { Blog } from "../models/Blogs";
import LoadingBar from "../components/LoadingBar";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Error from '../components/Error';

const BlogPost: FC = () => {
    const apiUrl = process.env.REACT_APP_API_URL!;

    const [loading, setLoading] = React.useState(false);

    const [notFound, setNotFound] = React.useState(false);

    const [blogPost, setBlogPost] = React.useState<Blog[]>([]);
    const [error, setError] = React.useState(false);

    const navigate = useNavigate();

    const { BlogId, id } = useParams();

    console.log("HELLO");

    useEffect(() => {
        const fetchData = async (BlogId: string, id: string) => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/Blog/${BlogId}/${id}`);
                setBlogPost(response.data);

            } catch (error) {
                console.log('error!!');
                console.log(error);
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.status === 404) {
                    setNotFound(true);
                } else {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        // Call the async function
        if (BlogId && id) {
            console.log("JERE")
            fetchData(BlogId!, id!);

        }
    }, [BlogId, id])

    if (loading) {
        return (
            <LoadingBar />
        )
    } else if (notFound) {
        return <NotFound />
    } else if (error) {
        return (
            <Error />
        )
    }
    return <h1>hello</h1>
}

export default BlogPost;
