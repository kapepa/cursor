import { ProjectIdView } from "@/features/projects/components/project-id-view";

const ProfilePage: NextPage<ProjectIdPageProps> = async ({ params }) => {
  const { projectId } = await params;

  return (
    <div>
      ProfilePage
    </div>
  )
}

export default ProfilePage;