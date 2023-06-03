import Link from "next/link";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Watch() {
    return (
        <>
            <div className="container">
                <div className="py-5 row">
                    <div className="text-center col-12">
                        Please select a movie or TV show to watch.
                    </div>
                    <div className="text-center col-12">
                        back to <Link href="/">Home</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
