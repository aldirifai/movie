"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Watch({ params }) {
    const { slug } = params;
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [stream, setStream] = React.useState(null);
    const [streaming, setStreaming] = React.useState(false);
    const [streamUrl, setStreamUrl] = React.useState(null);

    const handleStream = (url) => {
        setStreaming(true);
        setStreamUrl(url);
    };

    React.useEffect(() => {
        fetch(`https://lk21-api.cyclic.app/movies/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });

        fetch(`https://lk21-api.cyclic.app/movies/${slug}/streams`)
            .then((res) => res.json())
            .then((data) => {
                setStream(data);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <>
                <div className="container">
                    <div className="py-5 row">
                        <div className="text-center col-12">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        if (!data) {
            return (
                <>
                    <div className="container">
                        <div className="py-5 row">
                            <div className="text-center col-12">
                                <h1>Movie not found</h1>
                            </div>
                            <div className="text-center col-12">
                                back to <Link href="/">Home</Link>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="container">
                        <div className="py-5 row">
                            <div className="mb-3 text-center col-12">
                                <h1>{data.title}</h1>
                                <h5>{data.directors.join(", ")}</h5>
                                <div className="mt-5 embed-responsive embed-responsive-16by9">
                                    <iframe
                                        className="embed-responsive-item w-100"
                                        src={`${data.trailerUrl.replace(
                                            "watch?v=",
                                            "embed/"
                                        )}`}
                                        height={500}
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="text-center col-4 d-none d-lg-block">
                                <Image
                                    src={data.posterImg}
                                    width={300}
                                    height={450}
                                    alt={data.title}
                                />
                            </div>
                            <div className="text-left col-12 col-lg-8">
                                <p>{data.synopsis}</p>
                                <p>Release Date: {data.releaseDate}</p>
                                <p>Duration: {data.duration}</p>
                                <p>Genre: {data.genres.join(", ")}</p>
                                <p>Cast: {data.casts?.join(", ")}</p>

                                <hr />
                                <p>
                                    <h4>Streams</h4>
                                    <div className="mt-2 d-flex">
                                        {stream?.map((item) => (
                                            <div key={item.id}>
                                                <button
                                                    className="btn btn-primary me-3"
                                                    onClick={() =>
                                                        window.open(
                                                            item.url,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    {item.provider}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </p>
                            </div>
                            <div className="mt-3 text-center col-12">
                                {streaming && (
                                    <div className="mt-5 embed-responsive embed-responsive-16by9">
                                        <iframe
                                            className="embed-responsive-item w-100"
                                            src={streamUrl}
                                            height={600}
                                            allowFullScreen
                                            frameAncestor={false}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 text-center col-12">
                                <hr />
                                back to{" "}
                                <Link href="/" className="text-decoration-none">
                                    Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}
