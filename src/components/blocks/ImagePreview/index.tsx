"use client";
import { Image } from "antd";
import React from "react";

const imageStyle = { display: "none" };

interface IProps {
  src: string[];
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  isPreviewGroup?: boolean;
  current?: number;
}

const ImagePeview: React.FC<IProps> = ({
  setVisible,
  src,
  visible,
  isPreviewGroup,
  current,
}) => {
  return isPreviewGroup ? (
    <div style={imageStyle}>
      <Image.PreviewGroup
        preview={{
          current,
          onVisibleChange: (value) => {
            setVisible(value);
          },
          visible,
        }}>
        {src.map((image, idx) => (
          <Image
            rootClassName="shekel-root-preview"
            className="shekel-preview"
            key={image + idx.toString()}
            src={image}
            alt={image}
          />
        ))}
      </Image.PreviewGroup>
    </div>
  ) : (
    <Image
      rootClassName="shekel-root-preview"
      className="shekel-preview"
      alt={src[0]}
      style={imageStyle}
      src={src[0]}
      preview={{
        onVisibleChange: (value) => {
          setVisible(value);
        },
        src: src[0],
        visible,
      }}
    />
  );
};

ImagePeview.defaultProps = {
  isPreviewGroup: false,
};

export default ImagePeview;
