export const getProfile = async (user_uuid) => {
  let profile = {};

  const resp = await fetch("http://127.0.0.1:8000/api/users/" + user_uuid);
  const json = await resp.json();

  return json;
};

export const createAccount = async (first_name, last_name, email, password) => {
  const resp = await fetch(
    "http://127.0.0.1:8000/api/users/" + this.state.job.id,
    {
      method: "post",
      body: JSON.stringify({
        username: email,
        email,
        first_name,
        last_name,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await resp.json();

  return json;
};

export const login = async (email, password) => {
  const resp = await fetch("http://127.0.0.1:8000/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await resp.json();

  return json;
};

export const createJob = async (
  title,
  description,
  budget,
  skills_required,
  employer
) => {
  const resp = await fetch("http://127.0.0.1:8000/api/jobs", {
    method: "post",
    body: JSON.stringify({
      title,
      description,
      budget,
      skills_required,
      employer,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await resp.json();

  return json;
};

export const fetchJob = async (jobId) => {
  const resp = await fetch("http://127.0.0.1:8000/api/jobs/" + jobId);
  const json = await resp.json();

  return json;
};

export const createProposal = async (
  title,
  description,
  proposer,
  proposal_job
) => {
  const resp = await fetch("http://127.0.0.1:8000/api/proposals", {
    method: "post",
    body: JSON.stringify({
      title,
      description,
      proposer,
      proposal_job,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await resp.json();

  return json;
};

export const fetchProposals = async (jobId) => {
  const resp = await fetch("http://127.0.0.1:8000/api/proposals/" + jobId);
  const json = await resp.json();

  return json;
};
