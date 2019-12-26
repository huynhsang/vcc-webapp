import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px 10px;
`;

const Policy = () => {
    return (
        <Wrapper>
            <h3>Privacy Policy</h3>
            <p>Last updated: December 20, 2019</p>
            <p>
                Quora recognizes that your privacy is very important, and we
                take it seriously. This Privacy Policy (“Privacy Policy”)
                describes our policies and procedures on the collection, use,
                disclosure, and sharing of your personal information when you
                use the Quora Platform.
            </p>
            <p>
                This Privacy Policy applies to activities by Quora, Inc. and its
                affiliates and subsidiaries (collectively “Quora,” “we” or
                “us”). Capitalized terms that are not defined in this Privacy
                Policy have the meaning given to them in our Terms of Service.
            </p>

            <h4>The Information We Collect</h4>
            <p>
                We collect information directly from individuals, from third
                parties, and automatically through the VCNC Platform.
            </p>
            <p>
                <b>Account and Profile Information:</b> When you create an
                account and profile on the Quora Platform, we collect your name,
                contact information, demographic information, and other
                information you provide, such as topics that you know about or
                find interesting. Your name, photo, and any other information
                that you choose to add to your public-facing profile will be
                available for viewing by the public and other users of the Quora
                Platform. Once you create a profile, others will be able to see
                in your profile certain information about your activity on the
                Quora Platform, such as the questions and answers you post, your
                followers and who you follow, topics of interest to you, the
                information you list as credentials, and your edits to your
                content. For more information about your choices for publicly
                displayed information, see the section below about Your Choices.
            </p>
            <p>
                <b>Your Content:</b> We collect the information and content that
                you post to the Quora Platform, including your questions,
                answers, photos, and comments. Unless you have posted certain
                content anonymously, your content, date and time stamps, and all
                associated comments are publicly viewable on the Quora Platform,
                along with your name. This also may be indexed by search engines
                and be republished elsewhere on the Internet in accordance with
                our Terms of Service. For more information about what you can
                change, see the below section on Your Choices.
            </p>
            <p>
                <b>Communications:</b> When you communicate with us (via email,
                through the Quora Platform, or otherwise), we may maintain a
                record of your communication.
            </p>
            <p>
                <b>Integrated Service Provider and Linked Networks:</b> You can
                connect your existing Quora account with certain third-party
                networks like Twitter or Google, for example (each a “Linked
                Network”). You can also elect to sign in or sign up to the Quora
                Platform through a Linked Network. If you elect to sign up
                through or connect a Linked Network, we receive certain profile
                and account information about you from the Linked Network. These
                Linked Networks may also appear in your profile, so that people
                can find you on these Linked Networks. The specific information
                provided to us by Linked Networks is determined by you and these
                third parties, and may vary by network. In all cases, the
                permissions page for the Linked Network will describe the
                information being shared. You should consult their respective
                privacy policies for information about their practices. You may
                elect to use information from the Linked Network to populate
                your profile on the Quora Platform and help you find and follow
                your contacts on the Quora Platform. For information on your
                choices, including how to disconnect a Linked Network from your
                Quora profile, see the Your Choices section below. You may also
                elect to connect and make and receive payments to and from use
                through third-party networks (“Integrated Service Provider”); if
                you do so, you will be allowing us to pass to and receive from
                the Integrated Service Provider your login information and other
                user data for payment purposes.
            </p>
            <p>
                <b>Automatically Collected Information About Your Activity.</b>
                We use cookies, log files, pixel tags, local storage objects,
                and other tracking technologies to automatically collect
                information about your activities, such as your searches, page
                views, date and time of your visit, and other information about
                your use of the Quora Platform. We also collect information that
                your computer or mobile device provides to us in connection with
                your use of the Quora Platform such as your browser type, type
                of computer or mobile device, browser language, IP address,
                mobile carrier, unique device identifier, location, and
                requested and referring URLs. We also receive information when
                you view content on or otherwise interact with the Quora
                Platform, even if you have not created an account. For more
                information, see the “Cookies, Pixels and Tracking” section
                below and our Cookie Policy.
            </p>
            <p>
                <b>Engagement. </b>We collect browsing information – such as IP address
                and location, date and time stamp, user agent, Quora cookie ID
                (if applicable), URL, unique advertising or content identifiers
                (if applicable) and time zone, and other information about user
                activities on the Quora Platform, as well as on third-party
                sites and services that have embedded our Quora pixels
                (“Pixels”), widgets, plug-ins, buttons, or related services. See
                the section below about Quora Ads and Personalization for more
                detailed information about how our Pixels may be used by
                publishers or users of our advertising services (“Ad Services”)
                on the Quora Platform to enable personalization, as well as your
                choices related to advertising and personalization. We may also
                receive information about you from third parties, such as other
                users, partners (including ad partners), or our affiliated
                companies.
            </p>
        </Wrapper>
    );
};

export default Policy;
