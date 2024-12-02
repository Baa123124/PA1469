import { Href, Redirect } from "expo-router"

export default function Index() {
  // TODO: change this to actual auth session
  const authSession = false

  return <Redirect href={authSession ? "/map" : ("/login" as Href)} />
}
