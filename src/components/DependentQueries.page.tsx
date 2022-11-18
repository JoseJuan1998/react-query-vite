import { useQuery } from "react-query";
import { fetchChannel, fetchUserByEmail } from "../services/api";

interface Props {
  email: string;
}

export default function DependentQueries({ email }: Props) {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data.channelId;

  const { data: channel } = useQuery(
    ["channel", channelId],
    () => fetchChannel(channelId),
    {
      enabled: !!channelId,
    }
  );

  console.log({ channel, user });

  return <h2>RQ Dependent Queries</h2>;
}
