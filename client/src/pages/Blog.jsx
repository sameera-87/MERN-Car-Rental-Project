import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why Electric Vehicles Are the Future of Sri Lanka",
    excerpt:
      "Discover how EV adoption is transforming transportation in Sri Lanka and why renting electric cars makes sense today.",
    author: "Island Mobility Team",
    date: "Aug 12, 2025",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Top Scenic Routes to Explore by Car in Sri Lanka",
    excerpt:
      "From misty hill roads to coastal highways, here are the most beautiful routes you should experience behind the wheel.",
    author: "Travel Desk",
    date: "Sep 01, 2025",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "How to Choose the Right Rental Car for Your Trip",
    excerpt:
      "Planning a trip? Learn how to pick the perfect car based on distance, terrain, and passenger comfort.",
    author: "Customer Experience",
    date: "Sep 18, 2025",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-light min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-borderColor">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Island Insights
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Stories, travel tips, and sustainable mobility insights inspired by
            Sri Lanka.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden border border-borderColor shadow-sm hover:shadow-md transition-all"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Read More */}
                <button
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                >
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
