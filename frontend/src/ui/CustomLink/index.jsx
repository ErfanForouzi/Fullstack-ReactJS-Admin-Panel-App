import { Link } from 'react-router'
import { acl } from "@/components/acl"

 function CustomLink({children,...props}) {
  return (
    <Link {...props}>
    {children}
    </Link>
  )
}
export default acl(CustomLink)