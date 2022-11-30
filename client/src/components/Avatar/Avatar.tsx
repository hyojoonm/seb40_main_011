export default function Avatar(data: { image: string | undefined }) {
  const { image } = data;
  return (
    <img
      src={
        image === 'null' || image === null
          ? `https://codetech.nworld.dev/images/eb808675-ea4a-42c6-ae6b-582fcf70148d.blob`
          : `https://codetech.nworld.dev${image}`
      }
      alt="user-image"
      className="w-12 h-12 mx-3 mt-3 rounded-2xl drop-shadow-xl"
    />
  );
}
