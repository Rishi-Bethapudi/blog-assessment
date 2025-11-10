import PostEditor from '@/components/posts/PostEditor';

export default function NewPostPage() {
  return (
    <PostEditor
      onSubmit={(data) => {
        console.log('Submitting post:', data);
        // Later: await trpc.post.create.mutate(data)
      }}
      onCancel={() => window.history.back()}
    />
  );
}
