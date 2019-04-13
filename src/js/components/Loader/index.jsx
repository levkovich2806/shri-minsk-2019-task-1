import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function Loader() {
  return (
    <SkeletonTheme color="#fff" highlightColor="#444">
      <Skeleton width={300} height={42} />
    </SkeletonTheme>
  )
}

export default Loader;
