import dynamic from "next/dynamic";

const SampleClientWidget = dynamic(() => import("./SampleClientWidget"));

export default SampleClientWidget;
