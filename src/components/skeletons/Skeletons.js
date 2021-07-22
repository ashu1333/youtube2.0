import react from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Skeletons = () => {
  return (
    <div style={{ width: "100%", margin: "1rem 0" }}>
      <SkeletonTheme color="#343a40" highlightColor="#3c4147">
        <Skeleton height={140} />
        <div>
          <Skeleton
            style={{ margin: "0.5rem" }}
            circle
            height={40}
            width={40}
          />
          <Skeleton height={40} width="70%" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Skeletons;
