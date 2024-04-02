import React, { useMemo } from "react";
import { number, object, string } from "yup";
import AutoField from "../../forms/AutoField";
import Form from "../../forms/Form";
import SubmitButton from "../../forms/SubmitButton";
import ValidationsErrors from "../../forms/ValidationsErrors";
import { Article, ArticleForm } from "../article";
import { Picture } from "../../forms/PictureField";

const ArticleForm = ({
  initialArticle,
  onSubmit,
}: {
  initialArticle?: Article;
  onSubmit: (values: ArticleForm) => Promise<void>;
}): JSX.Element => {
  const ArticleSchema = useMemo(
    () =>
      object()
        .shape({
          title: string().label("Titre").max(200).nullable().required(),
          description: string()
            .label("Description")
            .max(400)
            .nullable()
            .required()
            .multiline(),
          image: string().label("Image").nullable().required(),
          content: string().label("Contenu").nullable().required().richText(),
          readingTime: number()
            .label("Temps de lecture (en minute)")
            .nullable()
            .required(),
        })
        .defined(),
    [],
  );

  return (
    <Form
      initialValues={initialArticle ? initialArticle : {}}
      onSubmit={onSubmit}
      schema={ArticleSchema}
    >
      <AutoField name={"title"} />
      <AutoField name={"description"} />

      <div className={"my-xxs"}>
        <label className={"bg-white z-10 relative px-xxs ml-xs text-xs"}>
          Image de l'article*
        </label>
        <Picture aspectRatio={"2/1"} name={"image"} />
      </div>

      <AutoField name={"content"} />

      <AutoField name={"readingTime"} />

      <div className={"pt-l flex items-center flex-col"}>
        <ValidationsErrors />
        <SubmitButton className={"uppercase"}>
          {initialArticle ? "Modifier" : "Créer"}
        </SubmitButton>
      </div>
    </Form>
  );
};

export default ArticleForm;
