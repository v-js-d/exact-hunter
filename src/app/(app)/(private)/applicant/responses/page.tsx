import RequireRole from '../../../../providers/router/RequireRole';

const ApplicantResponsesPage = () => (
  <RequireRole roles={['CANDIDATE']}>applicant responses page</RequireRole>
);

export default ApplicantResponsesPage;
