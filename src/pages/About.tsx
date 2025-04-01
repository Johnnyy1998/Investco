const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">About Portfolio Tracker</h1>
      <p className="text-lg mb-4">
        Portfolio Tracker is a simple, user-friendly app that helps you stay on
        top of your investments. Whether you're into stocks, ETFs, or crypto,
        this tool gives you a clear view of your holdings, performance, and
        allocation — all in one place.
      </p>
      <p className="text-lg mb-4">
        The app is built with <strong>React</strong> for speed and flexibility,
        and it's designed to be both beginner-friendly and useful for more
        experienced investors. You can track gains, losses, dividends, and
        monitor how your portfolio evolves over time.
      </p>
      <p className="text-lg mb-4">
        No signup. No paywall. Just your data, your way. More features are on
        the way — like live price updates, performance charts, and export tools.
      </p>
      <p className="text-lg mb-4">
        This project is open source. You can contribute, fork it, or use it as
        inspiration for your own tracker. Find the code on{" "}
        <a
          href="https://github.com/yourusername/portfolio-tracker"
          className="text-blue-600 underline"
        >
          GitHub
        </a>
        .
      </p>
      <p className="text-lg">
        Built with 💻 by a developer who hates spreadsheets.
      </p>
    </div>
  );
};

export default About;
