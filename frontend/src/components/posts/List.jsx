import { getPosts } from "@/redux/actions/post";
import { LoadingSkeleton, Space, Table } from "@/ui";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Remove from "./Remove";
import CustomLink from "@/ui/CustomLink";

function List({ getItems, data, loading }) {
  const [page,setPage] = useState(1);
  const columns = [
    { title: "ID", key: "id" },
    { title: "عنوان", key: "title" },
    { title: "متن", key: "text" },
    {
      title: "نویسنده",
      key: "user",
      render: (f, r) => `${f?.username}`,
    },
    {
      key: "action",
      render: (f, r) => (
        <Space>
          <Link to={`/posts/${r.id}`}>
            <EyeOutlined />
          </Link>
          <CustomLink role={'ADMIN'} to={`/posts/${r.id}/edit`}>
            <EditOutlined />
          </CustomLink>
         <CustomLink role={'ADMIN'}>
         <Remove id={r.id} getData={getItems} />
         </CustomLink>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getItems(page);
  }, [page]);

  return (
    <div>
      {loading ? (
        <LoadingSkeleton />
      ) : data?.articles?.length < 1 ? (
        <div>پست یافت نشد</div>
      ) : (
        <Table
          data={data?.articles}
          columns={columns}
          key={"id"}
          rowKey={"id"}
          onChange={({ current }) => setPage(current)}
          pagination={{
            total: data.totals,
            current: data.page,
            pageSize: data.limit,
          }}
        />
      )}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    data: state.posts,
    loading: state.postsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getItems: (page) => dispatch(getPosts(page)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
