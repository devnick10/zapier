import { ZapById } from "@/components/pages/zap-by-id";

export default async function page(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await props.params;

  return <ZapById id={id} />;
}
