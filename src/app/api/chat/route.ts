import { portfolioData } from "@/data/portfolioData";
import { NextResponse } from "next/server";

function generateResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  // Greeting
  if (/^(hi+|hey|hello|yo|sup|good\s*(morning|evening|afternoon))/.test(msg) || msg === "hi" || msg === "hey") {
    return `Hey there! 👋 I'm ${portfolioData.personal.name}, great to meet you!\n\nI'm a ${portfolioData.personal.title} passionate about building innovative solutions. Ask me about my **projects**, **skills**, **education**, or how to **contact** me!`;
  }

  // Skills
  if (msg.includes("skill") || msg.includes("tech") || msg.includes("what can you do") || msg.includes("stack") || msg.includes("know") || msg.includes("language") || msg.includes("programming") || msg.includes("what do you do")) {
    const skillCategories = Object.entries(portfolioData.skills)
      .map(([category, skills]) => `- **${category}**: ${(skills as string[]).join(", ")}`)
      .join("\n");
    return `Here are my key skills:\n\n${skillCategories}\n\nI'm always learning and expanding my expertise! 🚀`;
  }

  // Projects (general)
  if (msg.includes("project") && !msg.includes("agrivaani") && !msg.includes("wheelchair") && !msg.includes("campus")) {
    const projectList = portfolioData.projects
      .map((p) => `- **${p.title}**: ${p.longDescription ? p.longDescription.split('. ')[0] + '.' : ''} *(${p.technologies.join(", ")})*`)
      .join("\n");
    return `I've worked on some exciting projects:\n\n${projectList}\n\nWant to know more about any of them? 💡`;
  }

  // AgriVaani
  if (msg.includes("agrivaani") || msg.includes("agriculture") || msg.includes("farming") || msg.includes("crop")) {
    const project = portfolioData.projects.find((p) => p.id === "proj-1");
    if (project) {
      return `**${project.title}** is one of my flagship projects! 🌾\n\n${project.longDescription}\n\n**Technologies used**: ${project.technologies.join(", ")}`;
    }
  }

  // Wheelchair
  if (msg.includes("wheelchair") || msg.includes("fall detection") || msg.includes("safety") || msg.includes("iot")) {
    const project = portfolioData.projects.find((p) => p.id === "proj-2");
    if (project) {
      return `**${project.title}** is a project close to my heart! ♿\n\n${project.longDescription}\n\n**Technologies used**: ${project.technologies.join(", ")}`;
    }
  }

  // Campus cleanliness
  if (msg.includes("campus") || msg.includes("clean") || msg.includes("smart campus")) {
    const project = portfolioData.projects.find((p) => p.id === "proj-3");
    if (project) {
      return `**${project.title}** tackles a real-world problem! 🏫\n\n${project.longDescription}\n\n**Technologies used**: ${project.technologies.join(", ")}`;
    }
  }

  // Education
  if (msg.includes("education") || msg.includes("study") || msg.includes("college") || msg.includes("university") || msg.includes("degree") || msg.includes("cgpa") || msg.includes("gpa") || msg.includes("school") || msg.includes("qualification")) {
    const eduList = portfolioData.education
      .map((e) => `- **${e.degree}${e.field ? ` in ${e.field}` : ""}** — ${e.institution} (${e.graduationYear}) — ${e.gpa}`)
      .join("\n");
    return `Here's my educational background:\n\n${eduList}\n\nI'm passionate about continuous learning! 📚`;
  }

  // Certifications
  if (msg.includes("certif") || msg.includes("course") || msg.includes("nptel") || msg.includes("oracle") || msg.includes("badge") || msg.includes("credential")) {
    const certList = portfolioData.certifications
      .map((c) => `- **${c.name}** by ${c.issuer} (${c.issuedDate})${c.score ? ` — Score: ${c.score}` : ""}`)
      .join("\n");
    return `I've earned these certifications:\n\n${certList}\n\nI believe in validating skills through recognized platforms! 🏅`;
  }

  // Contact
  if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("connect") || msg.includes("hire") || msg.includes("linkedin") || msg.includes("github") || msg.includes("phone") || msg.includes("call")) {
    return `I'd love to connect! Here's how you can reach me:\n\n- 📧 **Email**: ${portfolioData.personal.email}\n- 📱 **Phone**: ${portfolioData.personal.phone}\n- 💼 **LinkedIn**: [linkedin.com/in/sharukesha](${portfolioData.social.linkedin})\n- 🐙 **GitHub**: [github.com/bixzz-creator](${portfolioData.social.github})\n\nFeel free to reach out anytime!`;
  }

  // About / introduction
  if (msg.includes("about") || msg.includes("who are you") || msg.includes("tell me about") || msg.includes("introduce") || msg.includes("yourself") || msg.includes("who is")) {
    return `Hi! I'm **${portfolioData.personal.name}**, a ${portfolioData.personal.title} based in ${portfolioData.personal.location}. 👋\n\n${portfolioData.about.story}\n\n**Current status**: ${portfolioData.about.availability}`;
  }

  // Experience
  if (msg.includes("experience") || msg.includes("work") || msg.includes("internship") || msg.includes("job") || msg.includes("career")) {
    return `I'm currently a ${portfolioData.personal.title} and I'm actively looking for internships and entry-level opportunities. 🎯\n\nMy project experience has given me strong hands-on skills in:\n- 🤖 **AI & Deep Learning** (AgriVaani)\n- 📡 **IoT** (Wheelchair Fall Detection)\n- 📱 **App Development** (Smart Campus)\n\nFeel free to reach out at **${portfolioData.personal.email}**! 🚀`;
  }

  // Interests
  if (msg.includes("interest") || msg.includes("hobby") || msg.includes("passion") || msg.includes("like to do") || msg.includes("free time")) {
    const interests = portfolioData.about.personalInterests?.join(", ") || "";
    return `I'm passionate about **${interests}**! 🎯\n\nThese interests drive my project work and continuous learning.`;
  }

  // Location
  if (msg.includes("where") || msg.includes("location") || msg.includes("based") || msg.includes("city") || msg.includes("live")) {
    return `I'm based in **${portfolioData.personal.location}** 📍\n\nI'm currently pursuing my B.Tech at Dr. N.G.P Institute of Technology.`;
  }

  // Resume
  if (msg.includes("resume") || msg.includes("cv") || msg.includes("download")) {
    return `You can view my full portfolio right here on this website! It includes all my **projects**, **skills**, **education**, and **certifications**.\n\nFor a quick overview:\n- 🎓 B.Tech IT, CGPA: 8.32\n- 🛠️ Java, HTML, CSS, JS, SQL, MongoDB\n- 🏅 NPTEL & Oracle certified\n\nFeel free to **contact** me for my detailed resume!`;
  }

  // Thanks
  if (msg.includes("thank") || msg.includes("thanks") || msg.includes("appreciate") || msg.includes("awesome") || msg.includes("nice") || msg.includes("cool")) {
    return `You're welcome! 😊 Feel free to ask me anything else about my skills, projects, or experience. I'm happy to help!`;
  }

  // Bye
  if (msg.includes("bye") || msg.includes("goodbye") || msg.includes("see you") || msg.includes("later")) {
    return `Goodbye! 👋 It was great chatting with you. Feel free to come back anytime!\n\nDon't forget to connect with me on [LinkedIn](${portfolioData.social.linkedin})! 💼`;
  }

  // Default
  return `Thanks for your message! Here's what I can help with:\n\n- 🛠️ **"What are your skills?"**\n- 📂 **"Tell me about your projects"**\n- 🎓 **"What's your education?"**\n- 🏅 **"Show me your certifications"**\n- 📬 **"How can I contact you?"**\n- 👤 **"Tell me about yourself"**\n\nJust ask about any of these! 😊`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const content = generateResponse(lastMessage.content);
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { content: "Sorry, I encountered an error. Please try again." },
      { status: 500 }
    );
  }
}
