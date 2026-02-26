"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Q = { q: string; options: string[]; answer: number };

export default function QuizPage() {
  const params = useParams<{ lessonId: string }>();
  const router = useRouter();
  const lessonId = Number(params.lessonId);

  // 10 preguntas por lección
  const questions: Q[] = useMemo(() => {
    if (lessonId === 1) {
      return [
        { q: "How do you say 'Hola' in English?", options: ["Hello", "Bye", "Thanks"], answer: 0 },
        { q: "Which is a greeting?", options: ["Good morning", "Apple", "Blue"], answer: 0 },
        { q: "What does 'Nice to meet you' mean?", options: ["Mucho gusto", "Buenas noches", "Adiós"], answer: 0 },
        { q: "Choose the correct: My name ___ Ana.", options: ["is", "are", "am"], answer: 0 },
        { q: "How do you say 'Gracias'?", options: ["Please", "Sorry", "Thanks"], answer: 2 },
        { q: "Which is a question?", options: ["How are you?", "Good night.", "See you."], answer: 0 },
        { q: "Goodbye means:", options: ["Hola", "Adiós", "Gracias"], answer: 1 },
        { q: "Choose greeting:", options: ["Chair", "Hello", "Book"], answer: 1 },
        { q: "How are you means:", options: ["¿Cómo estás?", "¿Qué hora es?", "¿Dónde estás?"], answer: 0 },
        { q: "See you later means:", options: ["Hasta luego", "Buenos días", "Perdón"], answer: 0 },
      ];
    }

    if (lessonId === 2) {
      return [
        { q: "Which is a vowel?", options: ["B", "A", "T"], answer: 1 },
        { q: "How many letters in the alphabet?", options: ["26", "24", "30"], answer: 0 },
        { q: "Letter after A?", options: ["C", "B", "D"], answer: 1 },
        { q: "Which is consonant?", options: ["E", "I", "M"], answer: 2 },
        { q: "Letter before Z?", options: ["Y", "X", "W"], answer: 0 },
        { q: "Is A a vowel?", options: ["Yes", "No", "Sometimes"], answer: 0 },
        { q: "Which is a vowel?", options: ["O", "P", "R"], answer: 0 },
        { q: "First letter of the alphabet?", options: ["A", "B", "C"], answer: 0 },
        { q: "Last letter of the alphabet?", options: ["Z", "Y", "X"], answer: 0 },
        { q: "Is B a vowel?", options: ["Yes", "No", "Sometimes"], answer: 1 },
      ];
    }

    if (lessonId === 3) {
      return [
        { q: "Plural of 'cat'?", options: ["Cats", "Cates", "Cat's"], answer: 0 },
        { q: "Plural of 'child'?", options: ["Children", "Childs", "Childes"], answer: 0 },
        { q: "Singular of 'dogs'?", options: ["Dog", "Dogs", "Doges"], answer: 0 },
        { q: "Plural of 'book'?", options: ["Books", "Bookes", "Book's"], answer: 0 },
        { q: "Singular of 'cars'?", options: ["Car", "Cars", "Care"], answer: 0 },
        { q: "Plural of 'box'?", options: ["Boxes", "Boxs", "Boxies"], answer: 0 },
        { q: "Plural of 'baby'?", options: ["Babies", "Babys", "Baby's"], answer: 0 },
        { q: "Singular of 'houses'?", options: ["House", "Houses", "Hous"], answer: 0 },
        { q: "Plural of 'bus'?", options: ["Buses", "Bus", "Buss"], answer: 0 },
        { q: "Singular of 'tables'?", options: ["Table", "Tables", "Tabl"], answer: 0 },
      ];
    }

    if (lessonId === 4) {
      return [
        { q: "Where do you sleep?", options: ["Bedroom", "Kitchen", "Garage"], answer: 0 },
        { q: "Where do you cook?", options: ["Kitchen", "Bathroom", "Office"], answer: 0 },
        { q: "Where do you shower?", options: ["Bathroom", "Bedroom", "Living room"], answer: 0 },
        { q: "Where do you park a car?", options: ["Garage", "Kitchen", "Hall"], answer: 0 },
        { q: "Where do you watch TV?", options: ["Living room", "Closet", "Garage"], answer: 0 },
        { q: "A sink is in the…", options: ["Kitchen", "Garage", "Roof"], answer: 0 },
        { q: "A bed is in the…", options: ["Bedroom", "Office", "Garage"], answer: 0 },
        { q: "A fridge is in the…", options: ["Kitchen", "Bathroom", "Bedroom"], answer: 0 },
        { q: "A toilet is in the…", options: ["Bathroom", "Kitchen", "Office"], answer: 0 },
        { q: "A table is in the…", options: ["Dining room", "Roof", "Car"], answer: 0 },
      ];
    }

    if (lessonId === 5) {
      return [
        { q: "I ___ a teacher.", options: ["am", "is", "are"], answer: 0 },
        { q: "She ___ happy.", options: ["is", "are", "am"], answer: 0 },
        { q: "They ___ students.", options: ["are", "is", "am"], answer: 0 },
        { q: "We ___ friends.", options: ["are", "is", "am"], answer: 0 },
        { q: "He ___ tall.", options: ["is", "are", "am"], answer: 0 },
        { q: "It ___ cold.", options: ["is", "are", "am"], answer: 0 },
        { q: "You ___ ready.", options: ["are", "is", "am"], answer: 0 },
        { q: "I ___ 30 years old.", options: ["am", "is", "are"], answer: 0 },
        { q: "She ___ a doctor.", options: ["is", "are", "am"], answer: 0 },
        { q: "They ___ at school.", options: ["are", "is", "am"], answer: 0 },
      ];
    }

    return [];
  }, [lessonId]);

  // si no existe quiz
  if (questions.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Quiz not found</h1>
        <p>No quiz for lesson {lessonId}.</p>
        <button onClick={() => router.push("/lessons")}>Back to Lessons</button>
      </div>
    );
  }

  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [saving, setSaving] = useState(false);

  // reset respuestas si cambias de lessonId
  useEffect(() => {
    setAnswers(Array(questions.length).fill(null));
  }, [questions.length]);

  const score = answers.reduce((acc, a, i) => (a === questions[i].answer ? acc + 1 : acc), 0);
  const passed = score >= 7;

  const submit = async () => {
    if (answers.some((a) => a === null)) {
      alert("Please answer all questions.");
      return;
    }

    setSaving(true);
    try {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        alert("You must be logged in.");
        router.push("/");
        return;
      }

      const { error } = await supabase.from("quiz_attempts").insert({
        user_id: user.id,
        lesson_id: lessonId,
        score,
        passed,
      });

      if (error) {
        alert("Error saving attempt: " + error.message);
        return;
      }

      alert(passed ? "✅ Passed! You can continue." : "❌ Not passed. Try again.");
      if (passed) router.push("/lessons");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, marginBottom: 6 }}>Quiz – Lesson {lessonId}</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>Score: {score}/10 (Pass: 7/10)</p>

      {questions.map((qq, i) => (
        <div key={i} style={{ border: "1px solid #333", borderRadius: 14, padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 18, marginBottom: 10 }}>
            {i + 1}. {qq.q}
          </div>

          {qq.options.map((opt, idx) => (
            <label key={idx} style={{ display: "block", padding: "6px 0", cursor: "pointer" }}>
              <input
                type="radio"
                name={`q${i}`}
                checked={answers[i] === idx}
                onChange={() => {
                  const next = [...answers];
                  next[i] = idx;
                  setAnswers(next);
                }}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={submit}
        disabled={saving}
        style={{
          padding: "12px 18px",
          borderRadius: 12,
          background: "#1fb6ff",
          color: "#000",
          fontWeight: 700,
          border: 0,
          cursor: saving ? "not-allowed" : "pointer",
        }}
      >
        {saving ? "Saving..." : "Submit Quiz"}
      </button>

      <div style={{ marginTop: 12, opacity: 0.8 }}>
        Result: {passed ? "✅ Passing" : "❌ Not passing yet"}
      </div>
    </div>
  );
}