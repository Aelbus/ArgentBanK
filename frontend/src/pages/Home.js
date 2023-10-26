import React from "react";
import Chat from "../assets/icon-chat.webp";
import Money from "../assets/icon-money.webp";
import Security from "../assets/icon-security.webp";
import Services from "../components/feature";
import "../styles/pages/Home.css";

const Home = () => {
  return (
    <main className="pages-div">
      <section className="hero">
        <div className="hero-banner">
          <article className="hero-content">
            <h2>
              No fees. <br />
              No minimum deposit. <br />
              High interest rates.
            </h2>
            <p>Open a savings account with Argent Bank today!</p>
          </article>
        </div>
      </section>
      <section className="services">
        <Services
          img={Chat}
          title="You are our #1 priority"
          desc="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <Services
          img={Money}
          title="More savings means higher rates"
          desc="The more you save with us, the higher your interest rate will be!"
        />
        <Services
          img={Security}
          title="Security you can trust"
          desc="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </main>
  );
};

export default Home;
