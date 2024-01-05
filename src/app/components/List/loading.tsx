import React from "react";
import ContentLoader from "react-content-loader";

function Loading(props: any) {
  return (
    <>
      <ContentLoader
        speed={3}
        width={460}
        height={323}
        viewBox="0 0 460 323"
        backgroundColor="#e0f0e6"
        foregroundColor="#006728"
        {...props}
      >
        <circle cx="58" cy="236" r="49" />
        <rect x="119" y="251" rx="5" ry="5" width="172" height="12" />
        <rect x="122" y="273" rx="5" ry="5" width="99" height="14" />
        <rect x="-26" y="-36" rx="0" ry="0" width="497" height="270" />
      </ContentLoader>
    </>
  );
}

export { Loading };
