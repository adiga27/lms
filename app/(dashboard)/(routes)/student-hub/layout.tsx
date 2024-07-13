import StudentHubList from "./_components/student-hub-list";

function StudentHubPage({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="p-4 space-y-4">
            <StudentHubList/>
            {children}
        </div>
    );
}

export default StudentHubPage;