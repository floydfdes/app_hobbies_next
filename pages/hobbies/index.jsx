import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { AiFillHeart, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { deletePost, likePost } from "../../controllers/post";
import { useRouter } from "next/router";
import Avatar from "react-avatar";

const Hobbies = ({ data, user }) => {
  const [currentUser, setCurrentUser] = useState();
  const router = useRouter();
  useEffect(() => {
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  console.log(currentUser);
  return (
    <div className="container">
      <Head>
        <title>Hobbies - Hobbies</title>
      </Head>

      <div className="container hobbies-container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-8 col-8">
            <h3>Feeds</h3>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-4 col-4 text-end">
            <Link href="/hobbies/createedit">
              <button className="btn btn-primary">
                <AiOutlinePlus />
                <div className="d-none d-md-inline">Create</div>
              </button>
            </Link>
          </div>
          {data &&
            data.map((field) => {
              return (
                <div key={field._id} className="col-md-4 col-sm-12 my-2">
                  <Card className="shadow-lg">
                    {/* <Image
                      className="card-image"
                      height={200}
                      width={200}
                      loading="lazy"
                      variant="top"
                      src={`https://source.unsplash.com/random/300x200?sig=${
                        field._id + Math.random()
                      }`}
                    /> */}
                    <Card.Body>
                      <Card.Title>{field.title}</Card.Title>
                      <Card.Text>{field.description}</Card.Text>
                      <div>
                        <Avatar
                          name={field.creatorName}
                          size="24"
                          round={true}
                        />
                        <span className="mx-2">
                          <strong>{field.creatorName}</strong>
                        </span>
                      </div>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      <div className="d-flex justify-content-around icon-span">
                        <span
                          onClick={() => {
                            likePost(field._id);
                            router.replace(router.asPath);
                          }}
                          className={!currentUser ? "disabled" : ""}
                        >
                          <AiFillHeart
                            fill="deeppink"
                            stroke="deeppink"
                          ></AiFillHeart>{" "}
                          {field.likes.length}
                        </span>
                        {currentUser && currentUser._id === field.creator && (
                          <span>
                            <FiEdit2 fill="green" stroke="green"></FiEdit2>
                          </span>
                        )}
                        {currentUser && currentUser._id === field.creator && (
                          <span
                            onClick={() => {
                              deletePost(field._id);
                              router.replace(router.asPath);
                            }}
                          >
                            <AiFillDelete
                              fill="darkred"
                              stroke="darkred"
                            ></AiFillDelete>
                          </span>
                        )}
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(
      "https://hobbies-project.herokuapp.com/posts"
    );
    return { props: { data } };
  } catch (err) {
    console.log(err);
  }
  return { props: { data: null } };
}

export default Hobbies;
