import { useParams, useNavigate } from "react-router-dom";
import useGetUsersList from "../../hooks/GetUsersList";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./EditPage.css";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  twitter: z.string().min(2),
  notes: z.string().min(1),
});
interface IFormInput extends z.infer<typeof schema> {}
export default function EditPage() {
  const { data } = useGetUsersList();
  if (!data) {
    return null;
  }
  const parameters = useParams<{ contactId: string }>();
  const thisUser = data[Number(parameters.contactId)];
  const navigane = useNavigate();
  // const { setBackGround } = useBackGroundStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: thisUser.firstName,
      lastName: thisUser.lastName,
      twitter: thisUser.twitter,
      notes: thisUser.notes,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    if (!data.firstName || !data.lastName || !data.twitter || !data.notes) {
      alert("All fields are required");
    } else {
      navigane(`/contacts/${thisUser.id}`);
      // setBackGround(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="EditContainer">
      <input type="text" {...register("firstName")} />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      <input type="text" {...register("lastName")} />
      {errors.lastName && <p>{errors.lastName.message}</p>}
      <input type="text" {...register("twitter")} />
      {errors.twitter && <p>{errors.twitter.message}</p>}
      <input type="text" {...register("notes")} />
      {errors.notes && <p>{errors.notes.message}</p>}
      <button type="submit" disabled={isSubmitting} className="EditButton">
        {isSubmitting ? "Loading..." : "Edit"}
      </button>
    </form>
  );
}
