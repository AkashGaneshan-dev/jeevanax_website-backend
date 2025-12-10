import app from "./app";

const PORT = process.env.PORT || 3000;
const VERCEL_PORT = process.env.VERCEL_PORT

app.listen(VERCEL_PORT, () => {
    console.log(`Server running on port ${VERCEL_PORT}`);
});
