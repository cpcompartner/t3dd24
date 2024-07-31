#
# Table structure for table 'tt_content'
#
CREATE TABLE tt_content
(
	cp_number_field int(11) DEFAULT 0 NOT NULL,
	cp_wide_image   int(11) DEFAULT 0 NOT NULL,
	cp_end_image    int(11) DEFAULT 0 NOT NULL
);

CREATE TABLE pages
(
	headline_image        int(11) unsigned DEFAULT '0' NOT NULL
);
