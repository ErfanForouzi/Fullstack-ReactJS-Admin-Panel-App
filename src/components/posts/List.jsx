import { useEffect } from "react";
import { Link } from "react-router";
import { request } from "@/tools/request";
import { EyeOutlined } from "@ant-design/icons";
import { LoadingSkeleton, Space, Table } from "@/ui";
import { connect } from "react-redux";
import { getPosts, setPosts } from "@/redux/actions/post";

const columns = [
  { title: "ID", key: "id" },
  { title: "Title", key: "title" },
  {
    key: "action",
    render: (f, r) => (
      <Space>
        <Link to={`/posts/${r.id}`}>
          <EyeOutlined />
        </Link>
      </Space>
    ),
  },
];
function List({ getItems, posts }) {
  // const [posts, setPosts] = useState([]);

  // async function getData() {
  //   const response = await request({ url: "/posts" });
  //   if (response?.status === 200) {
  //     setPosts(response?.data);
  //   } else {
  //     setPosts([]);
  //   }
  // }

  useEffect(() => {
    getItems();
  }, []);

  return (
    // <div>
    //   {loading ? (
    //     <LoadingSkeleton />
    //   ) : posts.length < 1 ? (
    //     <div>پست یافت نشد</div>
    //   ) : (
    //     <Table data={posts} columns={columns} />
    //   )}
    // </div>
    <div>
      {posts.length < 1 ? (
        <div>پست یافت نشد</div>
      ) : (
        <Table data={posts} columns={columns} />
      )}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}
// function mapDispatchToProps(dispatch) {
//   return {
//     setPosts:(data)=>dispatch(setPosts(data)),
//   }
// }
function mapDispatchToProps(dispatch) {
  return {
    getItems: () => dispatch(getPosts()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
