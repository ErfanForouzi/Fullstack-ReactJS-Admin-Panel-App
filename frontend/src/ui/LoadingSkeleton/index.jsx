import { Skeleton } from "antd";

export default function LoadingSkeleton({ loading=true, rows = 20, active = true }) {
  return <Skeleton active={active} loading={loading} paragraph={{ rows }} />;
}
