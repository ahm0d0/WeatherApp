import Image from "next/image";
import Weather from "./componts/Weather";

export default function Home() {
  return (
    <div className="min-h-screen  flex items-center justify-center bg-cyan-950">
    <Weather />
</div>
  );
}
