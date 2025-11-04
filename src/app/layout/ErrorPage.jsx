export default function ErrorPage() {
    return (
        <div style={{ padding: 20 }}>
            <h1>🚫 Something went wrong</h1>
            <p>Please try again or go back home.</p>
            <button onClick={() => (window.location.href = "/")}>Go Home</button>
        </div>
    );
}