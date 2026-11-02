import Link from "next/link";

export default function JoinCards() {
  return (
    <div className="join-grid">
      <div className="join-card reveal" id="members">
        <span className="kicker">For young women</span>
        <h3>Become a member</h3>
        <p>
          A young woman aged 16–25? Join free and grow your confidence, cyber skills and your
          sisterhood.
        </p>
        <Link href="/get-involved/member" className="btn btn-primary">
          Join the village →
        </Link>
      </div>
      <div className="join-card reveal" id="mentors">
        <span className="kicker">For women in tech</span>
        <h3>Mentor a member</h3>
        <p>
          Give an hour a month. Share your path, answer the questions, and be the woman in cyber you
          once needed.
        </p>
        <Link href="/get-involved/mentor" className="btn btn-primary">
          Become a mentor
        </Link>
      </div>
      <div className="join-card reveal" id="partners">
        <span className="kicker">For organisations</span>
        <h3>Partner &amp; fund</h3>
        <p>
          Universities, employers and funders: help us open doors at scale. Sponsor a circle, host a
          lab, or back the launch.
        </p>
        <Link href="/get-involved/partner" className="btn btn-primary">
          Partner with us
        </Link>
      </div>
    </div>
  );
}
