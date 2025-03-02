import dynamic from "next/dynamic";

const Maps = dynamic(() => import("./map"), { ssr: false });
export default Maps;
