import Image from "next/image";
import loader from "@/app/assets/loader.gif"

const LoadingPage = () => {
    return <div style={{
        display: "Flex",
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    }}>
        <Image src={loader} height={150} width={150} priority={true} alt="Loading..." />
    </div>;
};
 
export default LoadingPage;