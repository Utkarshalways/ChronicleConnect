'use client';
import React, { useEffect, useState } from 'react';
import { databases } from "@/lib/appwrite";
import { Query,Models } from "appwrite"; // Import Query here
import { useUser } from "@clerk/nextjs";
import { AuroraBackground } from '@/components/ui/aurora-background' 

const HomePage = () => {
  const { user, isLoaded } = useUser();
  const [stories, setStories] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(false);

  const data = {
    Story: "HEllo this is my story and it was more and more beautifull visit there",
    UserEmail: user?.emailAddresses[0]?.emailAddress ?? "NoMail@example.com",
    ImageUrl:
      "https://images.unsplash.com/photo-1744018195752-276f4f77cc7a?q=80&w=399&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    UserId: user?.id ?? "unknown",
  };

  async function handleButtonClick() {
    if (!isLoaded || !user) {
      alert("Please log in first.");
      return;
    }
    try {
      await databases.createDocument(
        "6878b7460026532d43cf",
        "6878da23000e1e2ce450",
        "unique()",
        data
      );
      alert("Story created!");
      // Optionally refetch stories here
      fetchStories();
    } catch (e) {
      alert("Failed to create story.");
      console.error(e);
    }
  }

  async function fetchStories() {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        "6878b7460026532d43cf",
        "6878da23000e1e2ce450"
        // [
        //   Query.equal("UserId", user?.id ?? "")
        // ]
      );
      console.log(response.documents)
      setStories(response.documents);
    } catch (err) {
      console.error("Failed to fetch stories:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchStories();
    // eslint-disable-next-line
  }, [isLoaded, user]);

  return (
    
      <div>
      <button
        onClick={handleButtonClick}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
      >
        Click Here
      </button>
    

      <div className="mt-8">
        <h2 className="text-xl font-bold">Your Stories</h2>
        {loading && <p>Loading stories...</p>}
        {!loading && stories.length === 0 && <p>No stories found.</p>}
        <ul>
          {stories.map((story) => (
            <li key={story.$id} className="my-4 p-4 border rounded">
              <p>{story.Story}</p>
              <p>{story.UserEmail}</p>
              <p>Total Upvotes :- {story.Upvotes}</p>
              
              <img src={story.ImageUrl} alt="story" className="w-32 mt-2" />

              <div className="text-xs text-gray-500 mt-1">
                Created: {story.$createdAt}
                <br/>
                updated: {story.$updatedAt}
              </div>
            </li>
          ))}
        </ul>
      </div>
        </div>
    
  );
}

export default HomePage;
