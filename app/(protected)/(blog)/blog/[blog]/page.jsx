import Image from 'next/image';

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
          reprehenderit!
        </h1>

        <div>
          {/* <Image src="" alt="" /> */}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-5">
          <div>
            <p className="my-5 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              nostrum, aliquid quisquam vel ipsam, iusto, ex aut tempora
              architecto commodi voluptates incidunt placeat qui asperiores
              consequuntur eos. Fugiat, nulla magni harum veniam iure magnam
              esse, ad provident illo voluptas quam dolorem! Eligendi totam cum
              optio aspernatur perspiciatis, porro non error!
            </p>
            <p className="my-5 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              nostrum, aliquid quisquam vel ipsam, iusto, ex aut tempora
              architecto commodi voluptates incidunt placeat qui asperiores
              consequuntur eos. Fugiat, nulla magni harum veniam iure magnam
              esse, ad provident illo voluptas quam dolorem! Eligendi totam cum
              optio aspernatur perspiciatis, porro non error!
            </p>
            <p className="my-5 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              nostrum, aliquid quisquam vel ipsam, iusto, ex aut tempora
              architecto commodi voluptates incidunt placeat qui asperiores
              consequuntur eos. Fugiat, nulla magni harum veniam iure magnam
              esse, ad provident illo voluptas quam dolorem! Eligendi totam cum
              optio aspernatur perspiciatis, porro non error!
            </p>
            <p className="my-5 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              nostrum, aliquid quisquam vel ipsam, iusto, ex aut tempora
              architecto commodi voluptates incidunt placeat qui asperiores
              consequuntur eos. Fugiat, nulla magni harum veniam iure magnam
              esse, ad provident illo voluptas quam dolorem! Eligendi totam cum
              optio aspernatur perspiciatis, porro non error!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
