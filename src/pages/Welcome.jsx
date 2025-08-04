import {Watermark, Image} from "antd";
import welcome from "../assets/images/welcome.jpeg";

const Welcome = () => {
    return (
        <div style={{textAlign: "center"}}>
            <Watermark content="公众号：比特星球">
                <h1>矿机管理系统</h1>
                <Image width={666} src={welcome}/>
            </Watermark>
        </div>
    );
};

export default Welcome;
