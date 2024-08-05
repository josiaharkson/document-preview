import { CloseOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ImagePeview from "../ImagePreview";
import constants from "@/utils/constants";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const { VIDEO_EXTENSIONS } = constants;
interface IProps {
  src: string | string[];
  extension: string;
  name?: string;
}

interface DialogProps {
  children: React.ReactNode;
  visible: boolean;
  onCancel?: any;
}

const PreviewModal: React.FC<DialogProps> = (props) => {
  if (!props?.visible) return null;

  return (
    <Dialog open={true} onOpenChange={() => props?.onCancel()}>
      <DialogHeader>
        <button
          onClick={() => props?.onCancel()}
          className="h-10 w-10 rounded-full bg-white p-1 shadow transition-all hover:bg-gray-100 ">
          <CloseOutlined />
        </button>
      </DialogHeader>

      <DialogContent className="sm:max-w-[425px]" shouldShowCloseIcon={false}>
        {props.children}
      </DialogContent>
    </Dialog>
  );
};

const Preview: React.FC<IProps> = ({ src, extension, name }) => {
  const [visible, setVisible] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const renderPreviewer = useCallback(() => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const isString = typeof src === "string";
    const file = isString ? src : src[0];
    const [ext] = extension.split("?");

    if (VIDEO_EXTENSIONS.includes(`.${ext.toLowerCase()}`)) {
      return (
        <PreviewModal
          visible={visible}
          onCancel={() => {
            setVisible(false);
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.pause();
            }
          }}>
          <video ref={videoRef} title={file} src={file} controls />
        </PreviewModal>
      );
    }

    if (ext.toLowerCase() === "pdf") {
      const [val] = file.split("?");
      return (
        <PreviewModal
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
            <div style={{ height: "80vh" }}>
              <Viewer fileUrl={val} plugins={[defaultLayoutPluginInstance]} />
            </div>
          </Worker>
        </PreviewModal>
      );
    }
    return (
      <ImagePeview
        isPreviewGroup={!isString}
        src={isString ? [src] : src}
        setVisible={setVisible}
        visible={visible}
      />
    );
  }, [src, visible, extension]);

  useEffect(() => {
    if (src && extension) setVisible(true);
  }, [src, extension]);
  return (
    <div className="bg-[whitesmoke] w-screen h-screen flex items-center justify-center">
      {renderPreviewer()}
      <button
        onClick={() => {
          if (!extension) {
            return window.open(
              typeof src === "string" ? src : src[0],
              "_blank"
            );
          }
          setVisible(true);
        }}
        disabled={!src}
        type="button"
        className={`group ${
          src
            ? "border border-[#475467] bg-white"
            : "cursor-not-allowed border-none bg-gray-200 bg-opacity-50"
        } flex w-full max-w-[10rem] items-center space-x-1.5 rounded-md  bg-white py-1 px-3 text-sm transition-all  group-hover:text-gray-500`}>
        <div>
          <svg
            className="fill-black group-hover:fill-gray-500"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9196 11.6C19.8996 6.91 16.0996 4 11.9996 4C7.89958 4 4.09958 6.91 2.07958 11.6C2.02452 11.7262 1.99609 11.8623 1.99609 12C1.99609 12.1377 2.02452 12.2738 2.07958 12.4C4.09958 17.09 7.89958 20 11.9996 20C16.0996 20 19.8996 17.09 21.9196 12.4C21.9746 12.2738 22.0031 12.1377 22.0031 12C22.0031 11.8623 21.9746 11.7262 21.9196 11.6ZM11.9996 18C8.82958 18 5.82958 15.71 4.09958 12C5.82958 8.29 8.82958 6 11.9996 6C15.1696 6 18.1696 8.29 19.8996 12C18.1696 15.71 15.1696 18 11.9996 18ZM11.9996 8C11.2085 8 10.4351 8.2346 9.7773 8.67412C9.1195 9.11365 8.60681 9.73836 8.30406 10.4693C8.00131 11.2002 7.9221 12.0044 8.07644 12.7804C8.23078 13.5563 8.61174 14.269 9.17115 14.8284C9.73056 15.3878 10.4433 15.7688 11.2192 15.9231C11.9951 16.0775 12.7994 15.9983 13.5303 15.6955C14.2612 15.3928 14.8859 14.8801 15.3255 14.2223C15.765 13.5645 15.9996 12.7911 15.9996 12C15.9996 10.9391 15.5782 9.92172 14.828 9.17157C14.0779 8.42143 13.0604 8 11.9996 8ZM11.9996 14C11.604 14 11.2173 13.8827 10.8884 13.6629C10.5595 13.4432 10.3032 13.1308 10.1518 12.7654C10.0004 12.3999 9.96084 11.9978 10.038 11.6098C10.1152 11.2219 10.3057 10.8655 10.5854 10.5858C10.8651 10.3061 11.2214 10.1156 11.6094 10.0384C11.9974 9.96126 12.3995 10.0009 12.7649 10.1522C13.1304 10.3036 13.4428 10.56 13.6625 10.8889C13.8823 11.2178 13.9996 11.6044 13.9996 12C13.9996 12.5304 13.7889 13.0391 13.4138 13.4142C13.0387 13.7893 12.53 14 11.9996 14Z" />
          </svg>
        </div>
        <p className="!mb-0 !text-sm !text-[#344054] group-hover:!text-gray-500">
          {src ? name || "View document" : "File Not available"}
        </p>
      </button>
    </div>
  );
};

export default Preview;
