import styles from "./FlagForm.module.css";
import FlagLabel from "./FlagLabel";

export default function FlagForm({ checklist, handleChecklist }) {
  console.log(checklist);
  return (
    <fieldset className={styles.flagFields}>
      <legend className={styles.fieldTitle}>Select flags</legend>
      <div className={styles.answerContainer}>
        <FlagLabel
          checked={checklist.includes("question")}
          onChange={handleChecklist}
          value="question"
        >
          Question
        </FlagLabel>

        <FlagLabel
          checked={checklist.includes("opinion")}
          onChange={handleChecklist}
          value="opinion"
        >
          Opinion
        </FlagLabel>

        <FlagLabel
          checked={checklist.includes("update")}
          onChange={handleChecklist}
          value="update"
        >
          Update
        </FlagLabel>

        <FlagLabel
          checked={checklist.includes("announcement")}
          onChange={handleChecklist}
          value="announcement"
        >
          Announcement
        </FlagLabel>

        <FlagLabel
          checked={checklist.includes("feedback")}
          onChange={handleChecklist}
          value="feedback"
        >
          Feedback
        </FlagLabel>

        <FlagLabel
          checked={checklist.includes("story")}
          onChange={handleChecklist}
          value="story"
        >
          Story
        </FlagLabel>
      </div>
    </fieldset>
  );
}
