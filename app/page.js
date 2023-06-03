"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearching(true);
        fetch(`https://lk21-api.cyclic.app/search/${search}`)
            .then((res) => res.json())
            .then((data) => {
                setSearchResults(data);
                setSearching(false);
            });

        setSearch("");
    };

    return (
        <main>
            <div
                className="container"
                style={{
                    height: "100vh",
                }}
            >
                <div className="py-5 text-center row h-100">
                    <div className="col-12">
                        <h1>Stream Your Movie</h1>
                        <p>
                            Welcome to Stream Your Movie. This is a simple
                            streaming service that allows you to watch movies
                            and TV shows.
                        </p>
                        <form className="form-inline d-flex">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                className="btn btn-outline-success ms-2"
                                onClick={(e) => handleSearch(e)}
                            >
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="py-5 col-12">
                        {searching ? (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        ) : (
                            <div className="text-left row">
                                {searchResults.map((result) => (
                                    <div
                                        className="mt-3 col-12 col-md-4 col-lg-3"
                                        key={result._id}
                                    >
                                        <div className="card h-100">
                                            <img
                                                src={result.posterImg}
                                                className="card-img-top"
                                                alt={result.title}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {result.title}
                                                </h5>
                                                <p className="card-text">
                                                    {result.directors.join(
                                                        ", "
                                                    )}
                                                </p>
                                                <p className="card-text">
                                                    {result.type === "movie" ? (
                                                        <span className="badge bg-primary">
                                                            Movie
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-success">
                                                            {result.type}
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-left card-text">
                                                    Genre:{" "}
                                                    {result.genres.join(", ")}
                                                </p>
                                                <p className="text-left card-text">
                                                    Cast:{" "}
                                                    {result.casts?.join(", ")}
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <Link
                                                    href={`/watch/${result._id}`}
                                                    className="mt-auto btn btn-success w-100"
                                                >
                                                    Watch
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
