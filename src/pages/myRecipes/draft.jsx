import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";
import toast from "react-hot-toast";
import Loading from "../../UI/loading";
import { formatDistanceToNow } from "date-fns";

const Draft = () => {
  const [drafts, setDrafts] = useState([]);
  const [showDraftsAction, setShowDraftsActiion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowDraftsAction = (draftId) => {
    setShowDraftsActiion(showDraftsAction === draftId ? null : draftId);
  };

  const deleteDraft = async (draftId) => {
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", draftId)
        .eq("is_draft", true);

      if (error) {
        console.error("Error deleting draft:", error);
        throw error;
      }

      setDrafts((prevDrafts) =>
        prevDrafts.filter((draft) => draft.id !== draftId),
      );
      toast.success("Draft successfully deleted");
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Failed to delete draft");
    }
  };

  useEffect(() => {
    const fetchDrafts = async () => {
      setIsLoading(true);

      try {
        const { data, error } = await supabase
          .from("recipes")
          .select(`*, countries (name)`)
          .eq("is_draft", true);

        if (error) {
          console.error("Error fetching drafts:", error);
          throw error;
        }

        setDrafts(data);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-auto my-14 flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <section className="w-full h-auto">
      {drafts.length === 0 ? (
        <p className="text-xl font-semibold text-gray-500 text-center mt-10">
          No drafts available..
        </p>
      ) : (
        <ul className="w-full h-auto grid grid-cols-3 gap-8 mt-14">
          {drafts.map((draft) => {
            const formattedDate = formatDistanceToNow(
              new Date(draft.created_at),
              { addSuffix: true },
            );

            return (
              <li
                key={draft.id}
                className="w-full h-auto rounded-3xl overflow-hidden shadow-[1px_2px_5px_rgba(41,37,36,0.1)]"
              >
                <div
                  className="w-full h-56 overflow-hidden relative"
                  onMouseEnter={() => handleShowDraftsAction(draft.id)}
                  onMouseLeave={() => setShowDraftsActiion(null)}
                >
                  <img
                    className="w-full h-full object-cover object-center"
                    src={draft.img_cover}
                    alt={draft.alt_text}
                    loading="lazy"
                  />
                  <span className="px-3 py-1.5 rounded-md bg-primary text-sm font-medium capitalize block absolute top-4 left-4">
                    {draft.category}
                  </span>
                  <AnimatePresence>
                    {showDraftsAction === draft.id && (
                      <motion.button
                        type="button"
                        className="absolute top-4 right-4 hover:cursor-pointer"
                        onClick={() => deleteDraft(draft.id)}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <Icons
                          iconsName={recipeIcons.myuiTrash}
                          className="size-6 text-red-500"
                        />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
                <div className="w-full h-auto p-6 bg-white">
                  <div className="w-full">
                    <p className="text-sm text-stone-500 capitalize">
                      {formattedDate}
                    </p>
                  </div>
                  <h3 className="text-xl font-medium text-inherit my-4">
                    {draft.title}
                  </h3>
                  <div className="my-4">
                    <span className="text-sm rounded-full w-fit h-7 px-2 border border-primary text-stone-600 flex items-center">
                      {draft.countries?.name}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between gap-4">
                    <div className="w-auto h-auto flex items-center gap-2">
                      <Link
                        to={`/edit/${draft.author_id}/${draft.slug}`}
                        className="size-7 rounded-md border border-gray-400 flex items-center justify-center hover:cursor-pointer"
                        title="Edit"
                        aria-label="Edit draft"
                      >
                        <Icons
                          iconsName={recipeIcons.riEdit}
                          className="size-5 text-gray-600"
                        />
                      </Link>
                      <Link
                        to={`/my-recipes/draft/preview/${draft.slug}`}
                        className="size-7 rounded-md border border-gray-400 flex items-center justify-center hover:cursor-pointer"
                        title="Preview"
                        aria-label="Preview draft"
                        onClick={() => window.scrollTo({ top: 0 })}
                      >
                        <Icons
                          iconsName={recipeIcons.pePopExpand}
                          className="size-5 text-gray-600"
                        />
                      </Link>
                    </div>
                    <div className="w-auto h-auto">
                      <button
                        type="button"
                        className="w-fit h-auto px-2 py-1.5 rounded-md bg-primary text-inherit font-medium text-sm hover:cursor-pointer"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Draft;
