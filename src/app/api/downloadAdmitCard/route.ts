import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';

export async function GET() {
	// for (const student of allStudentData) {
	const formData = new FormData();
	formData.append('__EVENTTARGET', 'ctl00$ContentPlaceHolder1$dgDetails$ctl03$lnkAdmitcard');
	formData.append('__EVENTARGUMENT', '');
	/* 	formData.append(
		'__VIEWSTATE',
		'tfmZ2t/ETlrpCSSaR2iBcLnaqOrCLdjrRiL1ezBApx9uL8mAw8UVXIFrFq//Gzh5AAnmPOifqR4y8CUvDpnMKaIFDgW9v/u7n6u6XnuhqH/QMVp9h3M9wYf3qjQoLcILk5TkCxhZTF8N72SJIs92Ig/+9UmblUAxHr2Gp8tXiSbkJKI0sMKwFbOvsco64IyB3vOeBymT+WD6uo0In1uIv8LRgSH/LFNfgXIL6yDOHngAElRgoFVz3sn5OPvBl2eA5NLgz/VVEdOHQ0ujqdp+HgEDqi5cGGTfvYhv/HwKJ6OlmQnJzGe69+sBgcXvfRnoG5Ou+HurP60RSCNupiuROm6O8UUJBUV14d6Hdd+zEh550D0kxhHAkyZ+hhBximRnb8rcr3mHY6zOIv4PX/mTO2kpxPd0PpnSPocFGRg8unVx9O6z4aFSuxK+YbaQJ4U0QYRzQOpZZXU3T6XmmpPnrhz3VaW3CzV5ynjD/yXhwjt9OyaQ2QI10R1imEHxkJCpIf3HEkwZO1TjgHjrSoNSxvf44Uim92X2AqVzJJYDf3joAO3d0yx97nFVg9jZk3qjka9+hA2Da41ZNOG/HJiJ8aW7ZltMUoYHe0x962mjGOlIZzIg8GKRxdhOWBs4lAtgi2YS8tvd8TNGV5MSutg70Zc4oD4Xtp3GKeuik22dG/S+W0tQk4jNQt4RtygwZTdplziZifxlMJUBQpyrwjnh7GSblJEyzxlcJUvYLoxmX3Ew0B/PsoRyvfNQ28kdmL56n/oNLVRm/NK0nzBBFcoRP/miFEVgLpmZH1RAIqxZHg9WQAg309PXEX0gdnZ1YWEppimA+I5lcxOHzm9ZCuMEaDQ1QMcOOVtdFCz+8LbUjETRF9M3hhF+S0ozw2rTK4j7q/B0hRdRLGmjHm+irEFDNviwaDyu81VEZbWBSzaJLUumPBnKM++pi2toO/49g1oALCfhMyamX7j64Tyc783ePZtWtP/KSb+mSj9Dc52bDQwqp3dnuJwTSS8tV0TS//w/edEbytNHfbf2+hxwfpKqX4Rk0t1YJcTZOhidAsHPdjPyVLzRnQN3wQZ+GyJnnb3vEYRt7tEj6jgSJgBfrxuHdJOloVpmWszCEOBdt3UIzWWk6DEoqcg9BlHs3Rtpfar+2oP9DplWZb3toweQE2ECKB4CgUHCSYA0aV01OMPF7Jz0GPGvt1NyQIPnEh1XQNRN2HuI6HvodDJnih8XoO52GdJ0mWsHQFkJHhrAC3AfmpI9xGjsoLtuTsR3tWDChBovrOfu0yHyWHaa2vgjxnB0OCJgMAlnQt6B/z65bEgUdBDP96cvYtKUPCie0aMc7zYpVWt7fUqEgO5x6ENtOzjigOnmmI2kDHfmAB4EewFTwWPAKexDS5FpyWyMUuNelQdWCm3NZM/mThWwxXtC87iovwNfiEShyP3gP+KVNt9Lxzfh76+AJyGjzz0DEQGN7YJm7UUyP0gZ0AMk2k4a7HhUulvFEaxrwosxEH9hpyGAXEzq5Zsfu7LuNUieXeDcCAWDjrAJX4imSOcJp8Lfj0r9ouQ4DaY='
	); */
	formData.append(
		'__VIEWSTATE',
		'jJ2/Aeoew0lS9U0Iwv1G+dsQYSoKcIRNboCq1tFbpRkQNCPkcbbB+sNktlk7PG2F1wzk9EVRG1WmVBoHrSATPsgFUh+oY41KREAxn5jjWfGaAJWjK/FbJs7wg/BNIY37vEbZytpsLqnlDARK8FArY5k8qbE1Hz/lv9ZBYhs7FDbBubIcH8s0THGJZWALVOg+Ld4A/OaYGuGhxmHZX9BJWH/D9Wxqw7ZJCd9LwRMav3ADbux4qnv/7BwmyITzK8CbPY1Yg9SVOQ52yyo7rG2lWQumJznE7HmJD5yM3aVCZMvOZXieKRA6RiGcU0QnHRp+7Egdl/WE4BxyKTJLkcB82DMqwxGeYAJDGGY8w2fpkzR0WJ4s5IZvBNbVvSn5Vhivivkkh/HeEls6MlEam5OGJZcYxrSKDFna44jbt7tOk7Lf+5oSKIT8cPnfreVLwvzicdc9WAVKcjIHdoYYfdpzoynqws7mKXf0nE2eUdFf72THPIFLOmqy2/Y/6D+rc1xEzA0p3Sf5+O1cSf4cKqvcVd/LYFYsTGgC2r3JtnIa2Ae/cPG1xusc43BSRVlRNsBjK3zJGK3Ou51a7PevlS1qIYQs2Qtry53I58yJNnUcMOszamUA6jvQ/7jWVOgOYZfSnHj3Ms8OwpRJ/7Xnazz2Z+4IkwicfywMtdcp2A8cnqVGqyUB8kPy3i76VMVu+6nQKg9jvEZ3soGBQfsNIc7ml6t1+Fj9And8HqJug1o2sVSb9SiE4lxYwaMc1N75/axC15JE///EURMi9Yq5143RQFMy3/mPnWjQd0zMus7AwysEZnpP95KaYbzTatQAkIUG37TcQIByRHRDKTl39SWeWLG+htbhfk2EcwJlBMEHaulreiPCa6u8XxK7HOXcIPWqDwas3IKVnJfG67qANzzuP67VQfkRhWXdUcCPs6o7tHw02a2B0BeltpSUMTLODkZ1l5GSSfKYnLODpvuO2zC2kM+OWQypzm9jfQk2hBeeG4WvkgRyLYDZKoh/J97s+iZbjSJV18+ZXAp1jFu1E9ZFVd50Gz1xIC+aRIGqX+qQyaFAsz/Qfw+FLL68ym3PkdMMTQcUx1PMKwsBAF9JJ22Nqx6gauVMgMVCWfmLR4e1bM7DrPzEhjYEvg2vAOF8UJoRiZ7Qw0UDeamTg6tjF05HU/ZY1wlGK02mYKmbdTTz1zprF0xQvXvobzMiCtKETYB0WTiF19K0NaVopLr/GXMnL7ok3qgQe4Ekixwt/cqxNUR62gVycCBVvTg9CGaHfwFJjV8/Ey9NwrjLwYPnBfEBNOvHAoWK3cvJIbe1kmgAZAhWqVNfujz7B13z+z9irUFh9rc67z1px/LRWqZTq8T4v5bqG0QUbiDu+r71IrWny+RDscF/NLnaJpV6wd3wkPBiJNYNJQA+6BpOjZvDWaKk4zAXUMbotNE89z9CaZi6U/1PGVs/4vq+tAs+6MiOKwZpXmtckjFOLGqRm+BbfvASmB2o/5ah1FZ0sMQzlCp/aYsujse+6JvbV9KVt7kgioPgjypmwg4Yb3Z2hXEcYLNBvCIRJx84ZXIl/jR6DUfTl7kKGvAvj1cm4v5Nm+og+8T2kOJ7OKV+hZt/OEq+MfswURDpVspjaMvKr2SlsaAiF92i2V0hkUmxc6OqYjP/A8ljkhzPHFDpAv0EvSrrqDHQSRV2x6aM0+r6asOPif/SXY3I7Tx14tJnFhIrM2k8Nqp8E4681dqdRkFEoIDHqbo4Y6nO9877S5qF//cRHOlOkxGxFQAB6mwhjnzDPZuL7FdrtjRjSAXEChPz1PdskZFLbKEQR0QxBXrkPPAS3Eq9UZh1/ei4CUvRG54+ufoIK5GRcJbbRowVa9Smzei82mdAObn9d0g='
	);
	formData.append('__VIEWSTATEGENERATOR', 'EA6D5239');
	formData.append('__VIEWSTATEENCRYPTED', '');
	/* 	formData.append(
		'__EVENTVALIDATION',
		'ZPTPqqs8enPeL8Q8HqbP/jCgOH/4SfEPphjmsmlYjCU0U1phr7a0ck4DlLNKx4QIcKqdEa6nkNFyqYxRs4MjnArzmn6r4JBVV/w/iSinot51iguMJQx4OrQWj+vFLDCV2/nNLoRRP/s8H6+jrXz5V1Jn0zGwDq7QQ8eilSJB7jessHqL7h3JAN9YIiB0YhfjEjyAdLaKsSaTaCpmZuCzslmAsd51iG0XIxck+Ex+LUNCvcgyiSEHEgPso2MuQDM9Ji77fdsgEhqOi+R56yLxzpNtgQ0T4SKO4RTNTuXfQo9BeXaXA3uETXo1AKnl5LYwA5QVOmuoWhslPABou3VDVWFoAtBRHWa9DstDWkYKgcK1vIYVGQM0xiIqlvcST6/GVkNKKIzWNmMS0X7pvlwOXMR+IcWC1JGx0k/wURSjxppeB+4SKhhh+dh2D6uNJsootagQ0nWMKFkgxqlbPQ+OK/IwlaFtfwFuJFGhgLmXXjnlSovPrc2WG5wD347kQF6l49Z6z41mOl/m3YYasM1+NAEeGKt2OgVTxavq6IHQ+CXhDalcrNUYkqPpg16VJjJEVBi2CHPBGf4YjOv9cElbgh6dr3c='
	); */
	formData.append(
		'__EVENTVALIDATION',
		'XFdulg+AWAWTFAgrpMsuPXpm5PZVTB7ZZleXfWfqrPEP7Vhzl+kpXGOCGsfTUXZu4S0bLnoef/OQsyF5Q6NZOt7xt+kFeMRy3kHGUZdxX0sTeCC9i5wCxxClRR7jr+SyAIZG92k4dH8NTNltR/8+Zpin/Q9VGoMCUbrE4hqydV8HmWrxD+eWHf23SbMUoqvnOWy1GOnkRdN2y8HksyD+45OiWPz08XbEuPSVM9uS1aummPf5DAORKrsfpltAGn9aB2gOxE9AkSdKzLjHbILCDJTR/hYXOwhtj3HUZy3YvK+c4KE8m6whkg1YlhInTNs+rqUW295Z516v5I8P604QWnruvZHRj5vp+KiYtXSJQPdJvM7+du+2/uhNBw4pDpFlAKOd3vRh4kNiK7GTbTRn7yfibTEsm6wr1QW72qHEXhyxoWWdvBKenQeqL4WLkR/YkcvnPcs35CyiTatHZ+z/vF9+yp6bSzGXeO+ipu3sjpr4JAQUyp5bW/cQZtUIEQ/cv0D1OR+A+zMaQjKzUnN8Cz7914EXb8pA7cyWlk4lpdhwiPx7CA0qqbajYWXh6e6StLxjD6W+woEiNCq8sk86GEjI+Nu4T3p+CLOARxuw011gUpX8'
	);
	formData.append('ctl00$ContentPlaceHolder1$txtRollNo', '21EUCIT036');
	formData.append('ctl00$ContentPlaceHolder1$txtpath', '');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl03$ctl00', '');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl03$ctl01', '');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl10', '');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl11', 'standards');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$AsyncWait$HiddenCancelField', 'False');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ToggleParam$store', '');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ToggleParam$collapse', 'false');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl08$ClientClickedId', '');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl07$store', '');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl07$collapse', 'false');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl09$VisibilityState$ctl00', 'None');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl09$ScrollPosition', '');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl09$ReportControl$ctl02', '');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl09$ReportControl$ctl03', '');
	formData.append('ctl00$ContentPlaceHolder1$recieptviewer$ctl09$ReportControl$ctl04', '100');

	const downloadAdmitCard = await axios.post(
		'https://rtu.sumsraj.com/Exam/Exam_Material/Download_AdmitCard.aspx',
		formData,
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept:
					'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
				'Content-Length': '3952',
			},
			responseType: 'arraybuffer',
		}
	);

	fs.writeFileSync('test.pdf', downloadAdmitCard.data);
	return NextResponse.json(downloadAdmitCard.data);
}
