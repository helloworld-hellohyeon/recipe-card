import { supabase } from "lib/initSupabase";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    console.log(error, data);
  }

  async function signInWithTwitter() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });
  }
  async function signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
  }
  async function getCards() {
    const { data: cards, error } = await supabase.from("cards").select("*");
    console.log(cards);
  }

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div>
      <button onClick={signInWithGoogle}>google login</button>
      <button onClick={signInWithTwitter}>Twitter login</button>
      <button onClick={signInWithFacebook}>Meta login</button>
    </div>
  );
};

export default Home;
