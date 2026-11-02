import { mailto } from "@/lib/site";

// TODO(forms stage): replace mailto links with the three registration forms.
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
        <a href={mailto("I want to join the village")} className="btn btn-primary">
          Join the village →
        </a>
      </div>
      <div className="join-card reveal" id="mentors">
        <span className="kicker">For women in tech</span>
        <h3>Mentor a member</h3>
        <p>
          Give an hour a month. Share your path, answer the questions, and be the woman in cyber you
          once needed.
        </p>
        <a href={mailto("I want to mentor")} className="btn btn-ghost">
          Become a mentor
        </a>
      </div>
      <div className="join-card reveal" id="partners">
        <span className="kicker">For organisations</span>
        <h3>Partner &amp; fund</h3>
        <p>
          Universities, employers and funders: help us open doors at scale. Sponsor a circle, host a
          lab, or back the launch.
        </p>
        <a href={mailto("Partnership enquiry")} className="btn btn-ghost">
          Partner with us
        </a>
      </div>
    </div>
  );
}
