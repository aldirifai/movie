export const metadata = {
    title: "Stream Your Movie",
    description:
        "Welcome to Stream Your Movie. This is a simple streaming service that allows you to watch movies and TV shows.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
